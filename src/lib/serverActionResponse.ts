type ServerActionResponse = {
  message: string;
  success: boolean;
};

function getSuccessMessage(): ServerActionResponse {
  return { message: "success", success: true };
}

function getFailureMessage(): ServerActionResponse {
  return { message: "failure", success: false };
}

export { getFailureMessage, getSuccessMessage, type ServerActionResponse };
