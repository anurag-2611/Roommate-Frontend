let listener;

export const statusFeedback = {
  success: (message) => listener?.({ type: "success", message }),
  error: (message) => listener?.({ type: "error", message }),
  subscribe: (callback) => {
    listener = callback;
    return () => {
      if (listener === callback) listener = undefined;
    };
  },
};
