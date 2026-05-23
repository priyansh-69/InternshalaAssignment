import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Size metadata of our brand icon
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Dynamic JSX-to-Image favicon generator that replaces the default Next.js 'N' logo
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: 'linear-gradient(135deg, #00A5EC 0%, #0070C0 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 8,
          fontWeight: '900',
          fontFamily: 'sans-serif',
        }}
      >
        I
      </div>
    ),
    {
      ...size,
    }
  );
}
