import { NextRequest, NextResponse } from 'next/server';

interface DisconnectPayload {
  clientip?: string;
  clientmac?: string;
  userId?: string;
}

export async function POST(request: NextRequest) {
  const { clientip, clientmac, userId } = (await request.json()) as DisconnectPayload;

  console.log('[DISCONNECT-API] Request:', { userId, clientip, clientmac });

  if (!clientip && !clientmac) {
    console.error('[DISCONNECT-API] Missing identifier (clientip/clientmac)');
    return NextResponse.json(
      { success: false, error: 'Missing identifier' },
      { status: 400 },
    );
  }

  const gateway = process.env.OPENNDS_GATEWAY || '192.168.1.1';
  const url = `http://${gateway}/cgi-bin/disconnect.cgi`;

  console.log('[DISCONNECT-API] Calling:', url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientip, clientmac }),
      signal: AbortSignal.timeout(5000),
    });

    let data: unknown = null;
    try {
      data = await response.json();
    } catch {
      console.warn('[DISCONNECT-API] Gateway response is not valid JSON');
    }

    console.log('[DISCONNECT-API] Response:', data);

    return NextResponse.json({
      success: true,
      message: 'Client disconnected',
      data,
    });
  } catch (error) {
    console.error('[DISCONNECT-API] Error while calling gateway:', error);
    // On renvoie quand même success: true pour ne pas bloquer l’UX côté portail
    return NextResponse.json({
      success: true,
      message: 'Client disconnect attempted, but gateway error occurred',
    });
  }
}



