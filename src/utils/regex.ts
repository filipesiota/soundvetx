export function generateRegexFromPath(path: string) {
    // Escape forward slashes and replace `{?}` with the appropriate regex pattern
    const regexPattern = path
        .replace(/\//g, '\\/') // Escape all '/'
        .replace(/\{\?\}/g, '[^/]+'); // Replace `{?}` with a pattern to match any non-slash characters

    // Return the complete regex with start and end line anchors
    return new RegExp(`^${regexPattern}$`);
}