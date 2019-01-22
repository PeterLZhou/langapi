"use strict";
exports.__esModule = true;
function assertGraphQLUserError(err) {
    if (err.graphQLErrors &&
        err.graphQLErrors[0] &&
        err.graphQLErrors[0].message == "Invalid User") {
        throw new Error("Your LANG_KEY inside of .env is incorrect or missing.");
    }
}
exports.assertGraphQLUserError = assertGraphQLUserError;
function assertGraphQLCreditsError(err) {
    if (err.graphQLErrors &&
        err.graphQLErrors[0] &&
        err.graphQLErrors[0].message ==
            "Not enough credits for these translation requests.") {
        throw new Error("Not enough credits for these translation requests.");
    }
}
exports.assertGraphQLCreditsError = assertGraphQLCreditsError;
function handleGraphQLError(err) {
    assertGraphQLNetworkError(err);
    assertGraphQLUserError(err);
    assertGraphQLCreditsError(err);
    assertGraphQLOtherError(err);
}
exports.handleGraphQLError = handleGraphQLError;
function assertGraphQLNetworkError(err) {
    if (err.networkError &&
        err.networkError.errno &&
        err.networkError.errno == "ECONNREFUSED") {
        throw new Error("There seems to be a problem with our server.");
    }
}
exports.assertGraphQLNetworkError = assertGraphQLNetworkError;
function assertGraphQLOtherError(err) {
    if (err) {
        throw new Error(err);
    }
}
exports.assertGraphQLOtherError = assertGraphQLOtherError;
//# sourceMappingURL=errors.js.map