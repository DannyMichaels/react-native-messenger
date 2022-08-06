import { Dimensions, FlatList, PixelRatio, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function Grid({
  data,
  renderItem,
  keyExtractor,
  numColumns = 4,
  itemMargin = StyleSheet.hairlineWidth,
  onEndReached,
}) {
  renderGridItem = (info) => {
    const { index } = info;

    const { width } = Dimensions.get('window');

    // pixel aligned size for each item in the grid
    // in react native we specify dimensions in terms of logical pixels rather than physical pixels
    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns
    );

    // we don't want to include a `marginLeft` on the first item of a row
    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;

    // we don't want to include a `marginTop` on the first row of the grid
    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({ ...info, size, marginLeft, marginTop });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      itemMargin={itemMargin}
      renderItem={renderGridItem}
      onEndReached={onEndReached}
    />
  );
}

Grid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  onEndReached: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func,
  numColumns: PropTypes.number,
  itemMargin: PropTypes.number,
};
