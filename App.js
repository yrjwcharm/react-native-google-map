import React from 'react';
import {
    Platform,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Text,
    Switch,
} from 'react-native';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import DisplayLatLng from './examples/DisplayLatLng';
import ViewsAsMarkers from './examples/ViewsAsMarkers';
import EventListener from './examples/EventListener';
import MarkerTypes from './examples/MarkerTypes';
import DraggableMarkers from './examples/DraggableMarkers';
import PolygonCreator from './examples/PolygonCreator';
import PolylineCreator from './examples/PolylineCreator';
import GradientPolylines from './examples/GradientPolylines';
import AnimatedViews from './examples/AnimatedViews';
import AnimatedMarkers from './examples/AnimatedMarkers';
import Callouts from './examples/Callouts';
import Overlays from './examples/Overlays';
import DefaultMarkers from './examples/DefaultMarkers';
import CustomMarkers from './examples/CustomMarkers';
import CachedMap from './examples/CachedMap';
import LoadingMap from './examples/LoadingMap';
import MapBoundaries from './examples/MapBoundaries';
import TakeSnapshot from './examples/TakeSnapshot';
import FitToSuppliedMarkers from './examples/FitToSuppliedMarkers';
import FitToCoordinates from './examples/FitToCoordinates';
import LiteMapView from './examples/LiteMapView';
import CustomTiles from './examples/CustomTiles';
import ZIndexMarkers from './examples/ZIndexMarkers';
import StaticMap from './examples/StaticMap';
import MapStyle from './examples/MapStyle';
import LegalLabel from './examples/LegalLabel';
import SetNativePropsOverlays from './examples/SetNativePropsOverlays';
import CustomOverlay from './examples/CustomOverlay';
import MapKml from './examples/MapKml';
import BugMarkerWontUpdate from './examples/BugMarkerWontUpdate';
import ImageOverlayWithAssets from './examples/ImageOverlayWithAssets';
import ImageOverlayWithURL from './examples/ImageOverlayWithURL';
import AnimatedNavigation from './examples/AnimatedNavigation';
import OnPoiClick from './examples/OnPoiClick';
import IndoorMap from './examples/IndoorMap';
import CameraControl from './examples/CameraControl';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

function makeExampleMapper(useGoogleMaps) {
  if (useGoogleMaps) {
    return example => [
      example[0],
      [example[1], example[3]].filter(Boolean).join(' '),
    ];
  }
  return example => example;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Component: null,
      useGoogleMaps: ANDROID,
    };
  }

  renderExample([Component, title]) {
    return (
        <TouchableOpacity
    key={title}
    style={styles.button}
    onPress={() => this.setState({ Component })}
  >
  <Text>{title}</Text>
    </TouchableOpacity>
  );
  }

  renderBackButton() {
    return (
        <TouchableOpacity
    style={styles.back}
    onPress={() => this.setState({ Component: null })}
  >
  <Text style={{ fontWeight: 'bold', fontSize: 30 }}>&larr;</Text>
    </TouchableOpacity>
  );
  }

  renderGoogleSwitch() {
    return (
        <View>
        <Text>Use GoogleMaps?</Text>
    <Switch
    onValueChange={(value) => this.setState({ useGoogleMaps: value })}
    style={{ marginBottom: 10 }}
    value={this.state.useGoogleMaps}
  />
  </View>
  );
  }

  renderExamples(examples) {
    const {
        Component,
        useGoogleMaps,
        } = this.state;

    return (
        <View style={styles.container}>
    {Component && <Component provider={useGoogleMaps ? PROVIDER_GOOGLE : PROVIDER_DEFAULT} />}
    {Component && this.renderBackButton()}
    {!Component &&
    <ScrollView
      style={StyleSheet.absoluteFill}
      contentContainerStyle={styles.scrollview}
      showsVerticalScrollIndicator={false}
          >
          {IOS && this.renderGoogleSwitch()}
      {examples.map(example => this.renderExample(example))}
    </ScrollView>
    }
  </View>
  );
  }

  render() {
    return this.renderExamples([
              // [<component>, <component description>, <Google compatible>, <Google add'l description>]
              [StaticMap, 'StaticMap', true],
              [DisplayLatLng, '跟踪位置', true, '(incomplete)'],
              [ViewsAsMarkers, '任意视图作为标记', true],
              [EventListener, 'Events', true, '(incomplete)'],
              [MarkerTypes, '基于图像的标记', true],
              [DraggableMarkers, '拖拽标记', true],
              [PolygonCreator, 'Polygon Creator', true],
              [PolylineCreator, 'Polyline Creator', true],
              [GradientPolylines, 'Gradient Polylines', true],
              [AnimatedViews, 'Animating with MapViews'],
              [AnimatedMarkers, 'Animated Marker Position'],
              [Callouts, 'Custom Callouts', true],
              [Overlays, 'Circles, Polygons, and Polylines', true],
              [DefaultMarkers, 'Default Markers', true],
              [CustomMarkers, 'Custom Markers', true],
              [TakeSnapshot, 'Take Snapshot', true, '(incomplete)'],
              [CachedMap, 'Cached Map'],
              [LoadingMap, 'Map with loading'],
              [MapBoundaries, 'Get visible map boundaries', true],
              [FitToSuppliedMarkers, 'Focus Map On Markers', true],
              [FitToCoordinates, 'Fit Map To Coordinates', true],
              [LiteMapView, 'Android Lite MapView'],
              [CustomTiles, 'Custom Tiles', true],
              [ZIndexMarkers, '使用 Z-index的位置标记', true],
              [MapStyle, '自定义映射的样式', true],
              [LegalLabel, '重新定位合法标签', true],
              [SetNativePropsOverlays, 'Update native props', true],
              [CustomOverlay, '自定义覆盖组件', true],
              [MapKml, '用KML加载地图', true],
              [BugMarkerWontUpdate, 'BUG: Marker不会更新(Android)', true],
              [ImageOverlayWithAssets, '图像覆盖组件与资产', true],
              [ImageOverlayWithURL, '图像覆盖组件与URL', true],
              [AnimatedNavigation, '动画地图导航', true],
              [OnPoiClick, 'On Poi Click', true],
              [IndoorMap, 'Indoor Map', true],
              [CameraControl, 'CameraControl', true],
            ]
            // Filter out examples that are not yet supported for Google Maps on iOS.
            .filter(example => ANDROID || (IOS && (example[2] || !this.state.useGoogleMaps)))
        .map(makeExampleMapper(IOS && this.state.useGoogleMaps))
  );
  }
}

const styles = StyleSheet.create({
      container: {
          ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    scrollview: {
  alignItems: 'center',
      paddingVertical: 40,
},
button: {
  flex: 1,
      marginTop: 10,
      backgroundColor: 'rgba(220,220,220,0.7)',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20,
},
back: {
  position: 'absolute',
      top: 20,
      left: 12,
      backgroundColor: 'rgba(255,255,255,0.4)',
      padding: 12,
      borderRadius: 20,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
},
});

export default App;
