export const environment = {
  production: true,
  host: 'http://localhost:8081',
  eventBus: 'http://localhost:8081/eventbus',
  api: 'http://localhost:8080/api',
  uuid: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a, b) {
      return b = Math.random() * 16, (a === 'y' ? b & 3 | 8 : b | 0).toString(16);
    });
  }
};
