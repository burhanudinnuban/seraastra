import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ICArrowBackPrimary,
  ICStarPrimary,
  ICVisibilitySecondary,
} from '../../assets';
import {ButtonOutline, Gap} from '../../components';
import BarView from '../../components/BarView';
import {requestGetDetailMovie} from '../../configs/redux/action';
import pages from '../../configs/styles/pages';
import {texts} from '../../configs/styles/texts';
import {colors, display, reducer} from '../../constants';

const DetailMovie = ({navigation, route}) => {
  const dispatch = useDispatch();

  const detail = route.params.movies;

  const [favourite, setfavourite] = useState(false);

  const global = useSelector(state => state.global);
  const movies = useSelector(state => state.movies);

  const loading = global.loading;
  const DetailMovies = movies.detailMovie;
  const dataFavourites = movies.dataFavourites;

  useEffect(() => {
    dispatch(requestGetDetailMovie(detail.id));
    const index = dataFavourites.findIndex(item => item.id === DetailMovies.id);
    if (index < 0) {
      setfavourite(false);
    } else {
      setfavourite(true);
    }
  }, [dispatch, detail.id, dataFavourites, DetailMovies.id]);

  function openBrowser() {
    Linking.canOpenURL(DetailMovies.homepage).then(supported => {
      if (supported) {
        Linking.openURL(DetailMovies.homepage);
      } else {
        alert("Don't know how to open URI: " + DetailMovies.homepage);
      }
    });
  }

  function didAddFavourite() {
    const index = dataFavourites.findIndex(item => item.id === DetailMovies.id);
    if (index < 0) {
      dispatch({
        type: reducer.DATA_FAVOURITES,
        value: [...dataFavourites, DetailMovies],
      });
    } else {
      const newFavourites = dataFavourites.filter(
        item => item.id !== DetailMovies.id,
      );
      dispatch({
        type: reducer.DATA_FAVOURITES,
        value: newFavourites,
      });
    }
  }

  return (
    <ScrollView>
      <BarView
        componentLeft={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ICArrowBackPrimary width={display.wp(8)} height={display.wp(8)} />
          </TouchableOpacity>
        }
        componentCenter={
          <Text allowFontScaling={false} style={texts.primaryLargeBold}>
            Movie Detail
          </Text>
        }
      />

      {loading ? (
        <View style={pages.center}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      ) : (
        <>
          {DetailMovies !== undefined ? (
            <View style={{...pages.padding10, ...pages.center}}>
              <Text style={texts.secondaryBoldMedium}>Movie</Text>
              <View
                style={{
                  ...pages.padding5,
                  ...pages.roundedBg(colors.secondary, null, 5, 15, null),
                  ...pages.rowCenterBetween,
                }}>
                <View style={pages.flex}>
                  <View style={pages.rowCenterBetween}>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={texts.secondaryBold}>
                      {DetailMovies.title}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={texts.secondary}
                      numberOfLines={1}>
                      {DetailMovies.original_language}
                    </Text>
                  </View>
                  <View style={pages.row}>
                    <ICVisibilitySecondary
                      width={display.wp(5)}
                      height={display.wp(5)}
                    />
                    <Gap wp={display.wp(2)} />
                    <Text
                      allowFontScaling={false}
                      style={texts.secondary}
                      numberOfLines={1}>
                      {DetailMovies.popularity}
                    </Text>
                  </View>

                  <TouchableOpacity onPress={openBrowser}>
                    <Text style={texts.blueBold}>Go to Website</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Gap hp={display.hp(2)} />
              <Text style={texts.secondaryBoldMedium}>Movie Specification</Text>
              <View
                style={{
                  ...pages.padding5,
                  ...pages.roundedBg(colors.secondary, null, 5, 15, null),
                }}>
                <Text allowFontScaling={false} style={texts.secondary}>
                  Title
                </Text>
                <Text allowFontScaling={false} style={texts.secondaryBold}>
                  {DetailMovies.original_title}
                </Text>
                <Gap hp={display.hp(2)} />
                <Text allowFontScaling={false} style={texts.secondary}>
                  Rating
                </Text>
                <View style={pages.row}>
                  <ICStarPrimary width={display.wp(5)} height={display.wp(5)} />
                  <Gap wp={display.wp(2)} />
                  <Text
                    allowFontScaling={false}
                    style={texts.secondary}
                    numberOfLines={1}>
                    {DetailMovies.vote_average}
                  </Text>
                </View>
                <Gap hp={display.hp(2)} />
                <Text allowFontScaling={false} style={texts.secondary}>
                  Adult
                </Text>
                <Text allowFontScaling={false} style={texts.secondaryBold}>
                  {DetailMovies.adult ? 'yes' : 'no'}
                </Text>
                <Gap hp={display.hp(2)} />
                <Text allowFontScaling={false} style={texts.secondary}>
                  Production Companies
                </Text>
                {DetailMovies.production_companies.map(item => (
                  <Text allowFontScaling={false} style={texts.secondaryBold}>
                    {item.name}
                  </Text>
                ))}

                <Gap hp={display.hp(2)} />
                <Text allowFontScaling={false} style={texts.secondary}>
                  Description
                </Text>
                <Text allowFontScaling={false} style={texts.secondaryBold}>
                  {DetailMovies.overview}
                </Text>
              </View>
              <Gap hp={display.hp(2)} />
              {favourite ? (
                <ButtonOutline
                  title={'Remove From Favourite'}
                  borderRadius={15}
                  backgroundColor={colors.silver}
                  width={display.wp(50)}
                  borderColor={colors.silver}
                  onPress={didAddFavourite}
                />
              ) : (
                <ButtonOutline
                  title={'Add To Favourite'}
                  borderRadius={15}
                  width={display.wp(50)}
                  onPress={didAddFavourite}
                />
              )}
            </View>
          ) : (
            <Text>Detail Movies not Found</Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default DetailMovie;
