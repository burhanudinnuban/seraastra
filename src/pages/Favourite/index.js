import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import BarView from '../../components/BarView';
import pages from '../../configs/styles/pages';
import {texts} from '../../configs/styles/texts';
import {useDispatch, useSelector} from 'react-redux';
import {colors, display, reducer} from '../../constants';
import {Gap} from '../../components';
import {ICStarPrimary, ICTrashRed} from '../../assets';

const Favourite = ({navigation}) => {
  const dispatch = useDispatch();

  const movies = useSelector(state => state.movies);

  const [Favourites, setFavourites] = useState([]);

  useEffect(() => {
    setFavourites(movies.dataFavourites);
  }, [movies.dataFavourites]);

  function didDetailMovie(params) {
    navigation.navigate('DetailMovie', {movies: params});
  }

  function didLogout() {
    dispatch({type: reducer.ISLOGIN, value: false});
    navigation.replace('Login');
  }

  function didDeleteFavourite(params) {
    const newFavourites = Favourites.filter(item => item.id !== params.id);
    dispatch({
      type: reducer.DATA_FAVOURITES,
      value: newFavourites,
    });
  }

  return (
    <View style={pages.flexWhite}>
      <BarView
        componentLeft={
          <Text allowFontScaling={false} style={texts.primaryLargeBold}>
            Favourite
          </Text>
        }
        componentRight={
          <TouchableOpacity onPress={didLogout}>
            <Text allowFontScaling={false} style={texts.redBold}>
              Logout
            </Text>
          </TouchableOpacity>
        }
      />
      {Favourites.length !== 0 ? (
        <FlatList
          data={Favourites}
          key={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                ...pages.rowCenter,
                ...pages.padding5,
                ...pages.roundedBg(colors.secondary, null, 5, null, null),
              }}
              onPress={() => didDetailMovie(item)}>
              <View style={pages.flex}>
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  style={texts.secondaryBold}>
                  {item.title}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={texts.secondary}
                  numberOfLines={2}>
                  {item.overview}
                </Text>
                <View style={pages.rowCenterBetween}>
                  <Text allowFontScaling={false} style={texts.secondary}>
                    {item.release_date}
                  </Text>
                  <View style={pages.row}>
                    <ICStarPrimary
                      width={display.wp(5)}
                      height={display.wp(5)}
                    />
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={texts.primary}>
                      {' '}
                      {item.vote_average}
                    </Text>
                  </View>
                </View>
              </View>
              <Gap wp={display.wp(5)} />
              <TouchableOpacity onPress={() => didDeleteFavourite(item)}>
                <ICTrashRed width={display.wp(8)} height={display.wp(8)} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={pages.center}>
          <Text style={texts.secondaryBoldMedium}>
            You don't have Favourite...
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favourite;
