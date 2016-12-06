import { css } from 'glamor';

const nav = css`
    height: 4.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ul = css`
    display: flex;
    & a {
        display: block;
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 500;
        text-decoration: none;
        position: relative;
        padding: 0 0.6rem;
        color: rgba(255,255,255,0.75);
        transition: color 0.25s ease;
    }
    & a:hover {
        color: rgba(255,255,255,1);
    }
    & a:before {
        content: '""';
        position: absolute;
        top: 50%;
        left: 5px;
        right: 5px;
        height: 0.05rem;
        background-color: currentColor;
        transform-origin: 0 50%;
        transform: scale3d(0, 1, 1);
        transition: transform 0.25s ease;
    }
    & a:hover:before {
        transform: scale3d(1, 1, 1)
    }
    & li {
        margin-right: 1.2rem
    }
    & li:last-child {
        margin-right: 0
    }
`;

export { nav, ul };
