import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import BarView from '../../components/BarView';
import pages from '../../configs/styles/pages';
import {texts} from '../../configs/styles/texts';
import {useDispatch, useSelector} from 'react-redux';
import {colors, display, reducer} from '../../constants';
import {Gap, WaitingView} from '../../components';
import {ICArrowRightPrimary, ICStarPrimary} from '../../assets';
import {requestGetMovies} from '../../configs/redux/action';

const Movies = ({navigation}) => {
  const dispatch = useDispatch();

  const [Moviess, setMoviess] = useState([]);

  const global = useSelector(state => state.global);

  const loading = global.loading;

  useEffect(() => {
    dispatch(requestGetMovies()).then(resp => {
      setMoviess(resp.results);
    });
  }, [dispatch]);

  function didDetailMovie(params) {
    navigation.navigate('DetailMovie', {movies: params});
  }

  function didLogout() {
    dispatch({type: reducer.ISLOGIN, value: false});
    navigation.replace('Login');
  }

  return (
    <View style={pages.flexWhite}>
      <BarView
        componentLeft={
          <Text allowFontScaling={false} style={texts.primaryLargeBold}>
            Movies
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
      {loading ? (
        <WaitingView />
      ) : (
        <>
          {Moviess.length !== 0 ? (
            <FlatList
              data={Moviess}
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
                  <ICArrowRightPrimary
                    width={display.wp(5)}
                    height={display.wp(5)}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={pages.center}>
              <Text style={texts.secondaryBoldMedium}>Movies not found...</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Movies;
