import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// https://github.com/inrupt/solid-client-authn-js/issues/1676#issuecomment-917016646
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
