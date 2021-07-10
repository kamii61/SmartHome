import React from 'react';

export default function Camera() {
  return (
    <div>
      <video id='videoInput' width='720' height='550' muted controls></video>
    </div>
  );
}
