module exampleAddress::transfer {

    use supra_framework::supra_coin;
    use supra_framework::coin::{Self, BurnCapability, FreezeCapability, MintCapability};
    use std::signer;
    use std::account;
    use std::string::String;
    use std::vector;
    use std::table::{Self, Table};
    use std::option::{Self, Option};
    use std::string;
    use std::timestamp;

    struct Money has store {}

    struct MoneyCapabilities has key {
        burn_cap: BurnCapability<Money>,
        freeze_cap: FreezeCapability<Money>,
        mint_cap: MintCapability<Money>,
    }

    struct Post has copy, store {
        post_hash: String,
        author_handle: String,
        author_fid: address,
        price: u64,
        reply_count: u64,
        recast_count: u64,
        like_count: u64,
        mint_time: u64,
        last_trade_time: u64,
        is_active: bool,
    }

    struct TradeHistory has copy, store {
        seller: address,
        buyer: address,
        price: u64,
        timestamp: u64,
    }

    struct UserStats has store {
        trade_volume: u64,
        posts_owned: vector<u64>,
    }

    struct PlatformData has key {
        token_id_counter: u64,
        initial_price: u64,
        max_price: u64,
        total_volume: u64,
        total_trades: u64,
        posts: table::Table<u64, Post>,
        trade_history: table::Table<u64, vector<TradeHistory>>,
        user_stats: table::Table<address, UserStats>,
        payment_coin_type: option::Option<Money>,
    }

    fun initialize(account: &signer, initial_price: u64, max_price: u64) {
        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<Money>(
            account,
            string::utf8(b"SocialPostTrading Money"),
            string::utf8(b"SPTM"),
            1,
            true,
        );
        move_to(account, MoneyCapabilities {
            burn_cap,
            freeze_cap,
            mint_cap,
        });
        let platform_data = PlatformData {
            token_id_counter: 0,
            initial_price,
            max_price,
            total_volume: 0,
            total_trades: 0,
            posts: table::new(),
            trade_history: table::new(),
            user_stats: table::new(),
            payment_coin_type: option::none(),
        };
        move_to(account, platform_data);
    }
 
    public entry fun mint_post(
        account: &signer,
        post_hash: String,
        author_handle: String,
        author_fid: address,
        reply_count: u64,
        recast_count: u64,
        like_count: u64
    ) acquires PlatformData {
        let platform_data = borrow_global_mut<PlatformData>(signer::address_of(account));
        let token_id = platform_data.token_id_counter;

        let current_time = timestamp::now_seconds();
        let post = Post {
            post_hash,
            author_handle,
            author_fid,
            price: platform_data.initial_price,
            reply_count,
            recast_count,
            like_count,
            mint_time: current_time,
            last_trade_time: current_time,
            is_active: true,
        };

        table::add(&mut platform_data.posts, token_id, post);
        update_user_stats(account, token_id, 0, platform_data);
        platform_data.token_id_counter = token_id + 1;
    }

    public entry fun buy_post<Money>(account: &signer, token_id: u64, payment: coin::Coin<Money>) acquires PlatformData {
        let platform_data = borrow_global_mut<PlatformData>(signer::address_of(account));
        let post = table::borrow_mut(&mut platform_data.posts, token_id);
        assert!(post.is_active, 2);

        let seller = post.author_fid;
        let buyer = signer::address_of(account);
        assert!(seller != buyer, 3);

        let price = post.price;
        assert!(coin::value(&payment) >= price, 4);

        coin::transfer<Money>(account, seller, price);
        post.price = price * 110 / 100;
        post.last_trade_time = timestamp::now_seconds();

        platform_data.total_volume = platform_data.total_volume + price;
        platform_data.total_trades = platform_data.total_trades + 1;

        update_user_stats(account, token_id, price, platform_data);
        let history = TradeHistory {
            seller,
            buyer,
            price,
            timestamp: timestamp::now_seconds(),
        };
        let trade_history = table::borrow_mut(&mut platform_data.trade_history, token_id);
        vector::push_back(trade_history, history);

        coin::deposit<Money>(signer::address_of(account), payment);
    }

    public entry fun sell_post(account: &signer, token_id: u64) acquires PlatformData {
        let platform_data = borrow_global_mut<PlatformData>(signer::address_of(account));
        let post = table::borrow_mut(&mut platform_data.posts, token_id);
        let owner = signer::address_of(account);
        assert!(post.is_active, 6); // Post not active
        let owner_ = post.author_fid;
        assert!(owner_ == owner, 7); // Not owner

        let sell_price = post.price * 90 / 100;
        post.is_active = false;

        platform_data.total_volume = platform_data.total_volume + sell_price;
        update_user_stats(account, token_id, sell_price, platform_data);

        let history = TradeHistory {
            seller: owner,
            buyer: owner,
            price: sell_price,
            timestamp: timestamp::now_seconds(),
        };
        let trade_history = table::borrow_mut(&mut platform_data.trade_history, token_id);
        vector::push_back(trade_history, history);
    }

    fun update_user_stats(account: &signer, token_id: u64, volume: u64, platform_data: &mut PlatformData) {
        let user_address = signer::address_of(account);
        // let platform_data = borrow_global_mut<PlatformData>(@hunch);

        if (!table::contains(&platform_data.user_stats, user_address)) {
            // Initialize user stats if they don't exist
            let new_stats = UserStats {
                trade_volume: 0,
                posts_owned: vector::empty<u64>(),
            };
            table::add(&mut platform_data.user_stats, user_address, new_stats);
        };

        let user_stats = table::borrow_mut(&mut platform_data.user_stats, user_address);

        // Update trade volume
        user_stats.trade_volume = user_stats.trade_volume + volume;

        // Update posts owned
        if (!vector::contains(&user_stats.posts_owned, &token_id)) {
            vector::push_back(&mut user_stats.posts_owned, token_id);
        };
    }
}