"use client";

export default function error({ error, reset }) {
  return (
    <html>
      <body>
        <div>
          <div>Something Went Wrong Global Error handler</div>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
