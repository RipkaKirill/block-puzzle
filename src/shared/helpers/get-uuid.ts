export const getUuid = () => {
  if (
    typeof self !== 'undefined' &&
    self.crypto &&
    typeof self.crypto.randomUUID === 'function'
  ) {
    return self.crypto.randomUUID();
  } else {
    // Fallback for environments where randomUUID is not available
    // This is a simplified example and might not be cryptographically secure
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
};