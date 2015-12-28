[![Build Status](https://travis-ci.org/telemark/pindena-proxy.svg?branch=master)](https://travis-ci.org/telemark/tfk-saksbehandling-skoleskyss)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tfk-saksbehandling-skoleskyss
Node modul for automatisk saksbehandling av henvendelser om skoleskyss.

Modulen er tenkt brukt sammen med [tfk-saksbehandling](https://github.com/telemark/tfk-saksbehandling)

Modulen setter opp en arbeidsflyt som henter inn diverse informasjon og legger denne til søknaden.

Det hele avsluttes med saksbehandling på bakgrunn av informasjonen og avslutter med å skrive søknaden med innhentet inhold og resultat i en json-fil. 

Regelsettet for saksbehandlingen er beskrevet i [docs/rules.md](https://github.com/telemark/tfk-saksbehandling-skoleskyss/blob/master/docs/rules.md)

Beskrivelse av arbeidsflyt ligger i [docs/workflow.md](https://github.com/telemark/tfk-saksbehandling-skoleskyss/blob/master/docs/workflow.md)

## Installasjon
```sh
$ git clone git@github.com:telemark/tfk-saksbehandling-skoleskyss.git
```

## Oppsett
```sh
$ npm run setup
```

## Test
```sh
$ npm test
```


