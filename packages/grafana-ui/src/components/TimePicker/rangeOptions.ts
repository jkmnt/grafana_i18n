import { t } from 'ttag';

import { TimeOption } from '@grafana/data';

export const quickOptions: TimeOption[] = [
  { from: 'now-5m', to: 'now', display: t`Last 5 minutes`, section: 3 },
  { from: 'now-15m', to: 'now', display: t`Last 15 minutes`, section: 3 },
  { from: 'now-30m', to: 'now', display: t`Last 30 minutes`, section: 3 },
  { from: 'now-1h', to: 'now', display: t`Last 1 hour`, section: 3 },
  { from: 'now-3h', to: 'now', display: t`Last 3 hours`, section: 3 },
  { from: 'now-6h', to: 'now', display: t`Last 6 hours`, section: 3 },
  { from: 'now-12h', to: 'now', display: t`Last 12 hours`, section: 3 },
  { from: 'now-24h', to: 'now', display: t`Last 24 hours`, section: 3 },
  { from: 'now-2d', to: 'now', display: t`Last 2 days`, section: 3 },
  { from: 'now-7d', to: 'now', display: t`Last 7 days`, section: 3 },
  { from: 'now-30d', to: 'now', display: t`Last 30 days`, section: 3 },
  { from: 'now-90d', to: 'now', display: t`Last 90 days`, section: 3 },
  { from: 'now-6M', to: 'now', display: t`Last 6 months`, section: 3 },
  { from: 'now-1y', to: 'now', display: t`Last 1 year`, section: 3 },
  { from: 'now-2y', to: 'now', display: t`Last 2 years`, section: 3 },
  { from: 'now-5y', to: 'now', display: t`Last 5 years`, section: 3 },
];

export const otherOptions: TimeOption[] = [
  { from: 'now-1d/d', to: 'now-1d/d', display: t`Yesterday`, section: 3 },
  { from: 'now-2d/d', to: 'now-2d/d', display: t`Day before yesterday`, section: 3 },
  { from: 'now-7d/d', to: 'now-7d/d', display: t`This day last week`, section: 3 },
  { from: 'now-1w/w', to: 'now-1w/w', display: t`Previous week`, section: 3 },
  { from: 'now-1M/M', to: 'now-1M/M', display: t`Previous month`, section: 3 },
  { from: 'now-1y/y', to: 'now-1y/y', display: t`Previous year`, section: 3 },
  { from: 'now/d', to: 'now/d', display: t`Today`, section: 3 },
  { from: 'now/d', to: 'now', display: t`Today so far`, section: 3 },
  { from: 'now/w', to: 'now/w', display: t`This week`, section: 3 },
  { from: 'now/w', to: 'now', display: t`This week so far`, section: 3 },
  { from: 'now/M', to: 'now/M', display: t`This month`, section: 3 },
  { from: 'now/M', to: 'now', display: t`This month so far`, section: 3 },
  { from: 'now/y', to: 'now/y', display: t`This year`, section: 3 },
  { from: 'now/y', to: 'now', display: t`This year so far`, section: 3 },
];
