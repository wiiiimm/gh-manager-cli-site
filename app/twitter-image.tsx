import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'gh-manager-cli - The Terminal Alternative to GitHub.com'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(34, 197, 94, 0.03) 35px, rgba(34, 197, 94, 0.03) 70px)',
            pointerEvents: 'none',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 60,
            gap: 32,
          }}
        >
          {/* Before/After comparison */}
          <div
            style={{
              display: 'flex',
              gap: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Before - GitHub.com */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  color: '#ef4444',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                }}
              >
                ❌ GitHub.com
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: '#94a3b8',
                  fontFamily: 'monospace',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div>• 20 repos per page</div>
                <div>• Multiple clicks per action</div>
                <div>• No bulk operations</div>
                <div>• Slow page loads</div>
              </div>
            </div>
            
            {/* Arrow */}
            <div
              style={{
                fontSize: 48,
                color: '#22c55e',
              }}
            >
              →
            </div>
            
            {/* After - gh-manager-cli */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  color: '#22c55e',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                }}
              >
                ✅ gh-manager-cli
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: '#94a3b8',
                  fontFamily: 'monospace',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div>• All repos, infinite scroll</div>
                <div>• Single keypress actions</div>
                <div>• Batch archive & delete</div>
                <div>• Instant, no reload</div>
              </div>
            </div>
          </div>
          
          {/* Main message */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              marginTop: 32,
            }}
          >
            <div
              style={{
                fontSize: 48,
                color: '#ffffff',
                fontFamily: 'monospace',
                fontWeight: 700,
              }}
            >
              Clean up 50+ repos in 5 minutes
            </div>
            <div
              style={{
                fontSize: 28,
                color: '#22c55e',
                fontFamily: 'monospace',
              }}
            >
              npx gh-manager-cli@latest
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}