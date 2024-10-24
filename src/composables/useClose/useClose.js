import { useRouter } from 'vue-router';

// eslint-disable-next-line import/prefer-default-export
export const useClose = (name) => {
  const router = useRouter();

  function close() {
    if (window.history.length === 1) window.close();
    return router.push({ name });
  }

  return { close };
};
