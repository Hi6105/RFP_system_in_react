//function to display the success toast message on call
export const success = (value, messageApi) => {
  messageApi.open({
    type: "success",
    content: value,
  });
};

//function to display the error toast message on call
export const error = (value, messageApi) => {
  messageApi.open({
    type: "error",
    content: value,
  });
};
