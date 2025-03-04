import { JsonRoute } from './JsonRoute';
import { PingRoute } from './PingRoute';
import { WeatherRoute } from './WeatherRoute';

export default [
  new PingRoute(),
  new WeatherRoute(),
  new JsonRoute(),
];
