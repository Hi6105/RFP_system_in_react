export const success = (value, messageApi) => {
  messageApi.open({
    type: "success",
    content: value,
  });
};

export const error = (value, messageApi) => {
  messageApi.open({
    type: "error",
    content: value,
  });
};
