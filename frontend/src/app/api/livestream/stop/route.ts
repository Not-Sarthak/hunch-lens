import { NextRequest, NextResponse } from "next/server";
import { Recorder } from "@huddle01/server-sdk/recorder";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');

  if (!roomId) {
    return NextResponse.json(
      { error: "Room ID is required" },
      { status: 400 }
    );
  }

  const recorder = new Recorder(
    "pi_r1eF1RMDv6FKiSSu",
    "ak_PCpgWw1myySv6zze"
  );

  try {
    const livestream = await recorder.stop({
      roomId: roomId,
    });

    return NextResponse.json({ livestream });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to stop livestream" },
      { status: 500 }
    );
  }
}
