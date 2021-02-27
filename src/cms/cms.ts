import CMS from 'netlify-cms-app';
import { IdWidget } from './IdWidget';
import { IdWidgetPreview } from './IdWidgetPreview';

CMS.registerWidget('id', IdWidget, IdWidgetPreview);
