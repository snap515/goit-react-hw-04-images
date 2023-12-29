import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { fetchImages } from "services/photoService";
import { STATUSES } from "utils/constants";
import { Loader } from "./Loader/Loader";

export class App extends Component{
  state = {
    searchText: '',
    data: null,
    status: STATUSES.idle,
    error: null,
    page: 1,
    isModalOpen: false,
    loadMore: false
  }

  onSubmit = e => {
    e.preventDefault();
    const searchText = e.currentTarget.elements.searchText.value;

    if (this.state.searchText !== searchText) {
      this.setState({
        searchText: searchText,
        data: null,
        page: 1,
      })
    }
  }

  getImages = async (searchText, page) => {
    try {
      this.setState({ status: STATUSES.pending });
      const data = await fetchImages(searchText, page);
      this.setState({ status: STATUSES.success, loadMore: this.state.page < Math.ceil(data.totalHits / 12 )})
      return data;
    }
    catch (error){
      this.setState({
        error: error.message,
        status:STATUSES.error
      })
    }
  }

  onLoadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.page !== prevState.page ||
      this.state.searchText !== prevState.searchText) {
        this.getImages(this.state.searchText, this.state.page).then(fetchData => {
          this.setState(prevState =>
          (
            prevState.data ? {
            data: [...prevState.data, ...fetchData.hits],
            } : { data: fetchData.hits }))
        })
    }
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit}/>
        <ImageGallery data={this.state.data}></ImageGallery>
        {this.state.data && this.state.loadMore && <Button onLoadMore={this.onLoadMore}></Button>}
        {this.state.status === STATUSES.pending && <Loader></Loader>}
      </div>
    );
  }
};