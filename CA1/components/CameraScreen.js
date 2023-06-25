import React from 'react';
import { RNCamera } from 'react-native-camera';

const CameraScreen = () => {
  return (
    <RNCamera
      style={{ flex: 1, alignItems: 'center' }}
      type={RNCamera.Constants.Type.back}
      captureAudio={false}
    />
  );
};

export default CameraScreen;