import { NextRequest, NextResponse } from "next/server";
import { Recorder } from "@huddle01/server-sdk/recorder";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId');
    console.log('Received request for room:', roomId);

    if (!roomId) {
      console.error('No roomId provided');
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    console.log('Checking RTMP URL configuration...');

    console.log('Initializing recorder...');
    const recorder = new Recorder(
      "pi_r1eF1RMDv6FKiSSu",
      "ak_PCpgWw1myySv6zze"
    );

    console.log('Generating access token...');
    const token = new AccessToken({
      apiKey: "ak_PCpgWw1myySv6zze",
      roomId: roomId,
      role: Role.BOT,
      permissions: {
        admin: true,
        canConsume: true,
        canProduce: true,
        canProduceSources: {
          cam: true,
          mic: true,
          screen: true,
        },
        canRecvData: true,
        canSendData: true,
        canUpdateMetadata: true,
      },
    });

    const accessToken = await token.toJwt();

    console.log('Starting livestream...');
    const rtmpUrl = `rtmp://a.rtmp.youtube.com/live2/6ycy-mjff-zd31-x49m-57s9`;
    const livestream = await recorder.startLivestream({
      roomId: roomId,
      token: accessToken,
      rtmpUrls: [rtmpUrl],
    });

    console.log('Livestream started successfully');
    return NextResponse.json({ 
      success: true,
      livestream 
    });

  } catch (error) {
    console.error('Livestream error:', error);
    return NextResponse.json(
      { 
        error: "Failed to start livestream",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';