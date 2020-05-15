import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Picker,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {getPhotos} from './actions/photos';

class App extends Component {
  state = {
    placeName: '',
    searchValue: '',
    places: [],
    shouldPickerBeVisible: false,
    gridFormat: 2,
    readyForGetData: true,
  };

  placeSubmitHandler = () => {
    if (this.state.searchValue.trim() === '') {
      return;
    }
    this.props.getPhotos(this.state.searchValue);
  };

  showSearchBar = () => {
    const {searchValue, shouldPickerBeVisible, gridFormat} = this.state;
    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search For Photos"
            style={styles.photosInput}
            value={searchValue}
            onChangeText={(text) => {
              this.setState({searchValue: text});
            }}
          />
          <Button
            title="Search"
            style={styles.placeButton}
            onPress={this.placeSubmitHandler}
          />
          <TouchableOpacity
            onPress={() =>
              this.setState({shouldPickerBeVisible: !shouldPickerBeVisible})
            }>
            <Text>Options</Text>
          </TouchableOpacity>
        </View>
        {shouldPickerBeVisible && (
          <View style={{width: '10%', alignSelf: 'flex-end'}}>
            <Picker
              selectedValue={gridFormat}
              onValueChange={(itemValue) =>
                this.setState({gridFormat: itemValue})
              }>
              <Picker.Item label={'2'} value={2} />
              <Picker.Item label={'3'} value={3} />
              <Picker.Item label={'4'} value={4} />
            </Picker>
          </View>
        )}
      </View>
    );
  };

  renderFooter = () => {
    const {isLoading} = this.props;
    if (!isLoading) {
      return null;
    }
    return <ActivityIndicator style={styles.loaderStyle} />;
  };

  handleLoadMore = () => {
    const {getPhotos} = this.props;
    const {readyForGetData} = this.state;
    if (readyForGetData) {
      this.setState({readyForGetData: false}, () => {
        setTimeout(() => this.setState({readyForGetData: true}), 2000);
      });
      getPhotos();
    }
  };

  _renderItem = ({item, index}) => {
    console.log('Item: ', item, item.url_n);
    return (
      <View key={index} style={{height: 48, width: 48}}>
        <Image
          source={{uri: item.url_n}}
          resizeMode="contain"
          style={{height: 48, width: 48}}
        />
      </View>
    );
  };

  placesOutput = () => {
    const {gridFormat} = this.state;
    return (
      <FlatList
        style={styles.listContainer}
        data={this.props.photos.data}
        numColumns={gridFormat}
        removeClippedSubviews={Platform.OS === 'android'}
        ListFooterComponent={this.renderFooter}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={50}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        legacyImplementation
        key={gridFormat === 2 ? 'Two' : gridFormat === 3 ? 'Three' : 'Four'}
        ListHeaderComponent={this.showSearchBar}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
      />
    );
  };

  render() {
    const {shouldPickerBeVisible, gridFormat} = this.state;
    console.log('Photos: ', this.props.photos);
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.listContainer}>{this.placesOutput()}</View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  placeInput: {
    width: '70%',
  },
  photosInput: {
    width: '70%',
  },
  placeButton: {
    width: '30%',
  },
  listContainer: {
    width: '100%',
  },
  loaderStyle: {color: '#000', marginBottom: 20},
});

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
  };
};

export default connect(mapStateToProps, {getPhotos})(App);
