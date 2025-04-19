export const config = {

  useRailway: false,  
  
  urls: {
    local: 'http://localhost:3000',
    railway: 'https://fittrackerbackend-production.up.railway.app'
  },

  get baseURL() {
    return this.useRailway ? this.urls.railway : this.urls.local;
  }
};