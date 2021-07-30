## This is the POC how the i18n could be applied to Grafana

Traditional **gettext** way, of course, with the help of ttag (https://ttag.js.org) library.

The text strings in sources are transformed to the ES6 tagged templates, 
i.e. 
```javascript
const s = 'Relative time ranges'
``` 
becomes 
```javascript
const s = t`Relative time ranges`
```

The ttag babel plugin extracts these strings as a side-effect of the production build:
```
yarn build
```

The strings goes into the [pot template](https://github.com/jkmnt/grafana_i18n/blob/i18n/app.pot).
The normal gettext workflow follows: msginit, msgmerge, locale-specific .PO files, Poedit-armed translators etc.
The resulting [.po files](https://github.com/jkmnt/grafana_i18n/blob/i18n/ru.po) are used to create localized builds:
```
yarn build:ru
```
The ttag babel plugin replaces the tagged strings with the localized ones, so there is no perfomance penalty.

Each build is placed in the separate directory, i.e. `build` (original EN build), `build_ru`, `build_uk` etc.
The entry points are `index.html`, `index_ru.html`, `index_uk.html`.

#### FAQ

**Q: What about the angular templates etc ?**

**A:** This supports only the js/react part. The Angular is deprecated in Grafana anyway.

**Q: What about backend ? A lot of messages in Grafana (navigation etc.) come from backend**

**A:** Remains untranslated.

**Q: How user may choose language ?**

**A:** The backend will serve `public/views/index.html` in any case. There is no way to choose `index_{locale}.html` based on user language preference without
hacking the backend code. You may replace it (or symlink) to set global per-server language.
  
**Q: The right way to do it is ..., and your code style is ...**

**A:**  I'm not frontend guy.


**Q: Why the fork is off the latest Grafana 7 branch, not Grafana 8 ?**

**A:** I don't want AGPL.


**Q: Why didn't you tag all the text strings in sources ?** 

**A:** It's the POC, so just a few strings were tagged to prove the concept.


## Original readme follows ...

![Grafana](docs/logo-horizontal.png)

The open-source platform for monitoring and observability.

[![License](https://img.shields.io/github/license/grafana/grafana)](LICENSE)
[![Circle CI](https://img.shields.io/circleci/build/gh/grafana/grafana)](https://circleci.com/gh/grafana/grafana)
[![Go Report Card](https://goreportcard.com/badge/github.com/grafana/grafana)](https://goreportcard.com/report/github.com/grafana/grafana)

Grafana allows you to query, visualize, alert on and understand your metrics no matter where they are stored. Create, explore, and share dashboards with your team and foster a data driven culture:

- **Visualize:** Fast and flexible client side graphs with a multitude of options. Panel plugins offer many different ways to visualize metrics and logs.
- **Dynamic Dashboards:** Create dynamic & reusable dashboards with template variables that appear as dropdowns at the top of the dashboard.
- **Explore Metrics:** Explore your data through ad-hoc queries and dynamic drilldown. Split view and compare different time ranges, queries and data sources side by side.
- **Explore Logs:** Experience the magic of switching from metrics to logs with preserved label filters. Quickly search through all your logs or streaming them live.
- **Alerting:** Visually define alert rules for your most important metrics. Grafana will continuously evaluate and send notifications to systems like Slack, PagerDuty, VictorOps, OpsGenie.
- **Mixed Data Sources:** Mix different data sources in the same graph! You can specify a data source on a per-query basis. This works for even custom datasources.

## Get started

- [Get Grafana](https://grafana.com/get)
- [Installation guides](http://docs.grafana.org/installation/)

Unsure if Grafana is for you? Watch Grafana in action on [play.grafana.org](https://play.grafana.org/)!

## Documentation

The Grafana documentation is available at [grafana.com/docs](https://grafana.com/docs/).

## Contributing

If you're interested in contributing to the Grafana project:

- Start by reading the [Contributing guide](/CONTRIBUTING.md).
- Learn how to set up your local environment, in our [Developer guide](/contribute/developer-guide.md).
- Explore our [beginner-friendly issues](https://github.com/grafana/grafana/issues?q=is%3Aopen+is%3Aissue+label%3A%22beginner+friendly%22).

## Get involved

- Follow [@grafana on Twitter](https://twitter.com/grafana/).
- Read and subscribe to the [Grafana blog](https://grafana.com/blog/).
- If you have a specific question, check out our [discussion forums](https://community.grafana.com/).
- For general discussions, join us on the [official Slack](http://slack.raintank.io/) team.

## License

Grafana is distributed under the [Apache 2.0 License](https://github.com/grafana/grafana/blob/master/LICENSE).
