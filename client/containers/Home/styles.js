import { merge, select as $ } from 'glamor';

const container = merge(
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        maxWidth: '65rem',
        margin: '-4.8rem auto 0',
    },
    $(' h2', {
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontWeight: '300',
    }),
);

export { container };

