import { NextResponse } from 'next/server';

export async function GET() {
  const isSocketIORunning = !!global.io;
  const connectedClients = global.io ? global.io.engine.clientsCount : 0;

  return NextResponse.json({
    message: 'Socket.IO server status',
    endpoint: '/api/socket',
    isRunning: isSocketIORunning,
    connectedClients,
    timestamp: new Date().toISOString(),
  });
}
