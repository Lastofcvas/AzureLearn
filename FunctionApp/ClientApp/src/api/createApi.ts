import todoApi from '../behavior/todo/requests';

const createApi = () => ({
  ...todoApi
})

export type Api = ReturnType<typeof createApi>;
export default createApi;