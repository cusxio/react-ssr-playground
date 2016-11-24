import { style, merge, select as $ } from 'glamor';

const nav = style({
    height: '4.8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const ul = merge(
    { display: 'flex' },
    $(' a', {
        display: 'block',
        fontSize: '14px',
        textTransform: 'uppercase',
        fontWeight: '500',
        textDecoration: 'none',
        position: 'relative',
        padding: '0 0.6rem',
        color: 'rgba(255,255,255,.75)',
        transition: 'color 0.25s ease',
    }),
    $(' a:hover', {
        color: 'rgba(255,255,255,1)',
    }),
    $(' a:before', {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '5px',
        right: '5px',
        height: '0.05rem',
        backgroundColor: 'currentColor',
        transformOrigin: '0 50%',
        transform: 'scale3d(0, 1, 1)',
        transition: 'transform 0.25s ease',
    }),
    $(' a:hover:before', {
        transform: 'scale3d(1, 1, 1)',
    }),
    $(' li', {
        marginRight: '1.2rem',
    }),
    $(' li:last-child', {
        marginRight: '0',
    }),
);

export { nav, ul };
