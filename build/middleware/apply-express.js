export default function applyExpressMiddleware(fn, req, res) {
    const originalEnd = res.end;

    return new Promise((resolve) => {
        res.end = function end(...args) {
            originalEnd.apply(this, args);
            resolve(false);
        };
        fn(req, res, () => {
            resolve(true);
        });
    });
}
