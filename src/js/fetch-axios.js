import axios from 'axios';


export default class SearchImg {

    constructor() {
      this.name = '';
      this.page = 1;
    }
  
    async fetchImgByName() {
      
      try {
        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            key: '31496924-d8fd8818ff2a696d197ea85c0',
            q: this.name,
            page: this.page,
            per_page: 12,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
          },
        });
        console.log(response);
        this.page += 1;
        return response.data;
      } 
      
      catch (error) {
        console.log(error.message);
      }
    }

  }