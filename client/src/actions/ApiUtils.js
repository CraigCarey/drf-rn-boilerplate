var ApiUtils = {
    checkStatus: function(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = response.json();
            throw error;
        }
    }
};
export { ApiUtils as default };
