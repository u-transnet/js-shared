// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import Monitor from './certifiers.monitor';

export default class CertificationsMiddleware {
  constructor (api) {
    this._api = api;
  }

  toMiddleware () {
    return (store) => {
      Monitor.init(this._api, store);

      return (next) => (action) => {
        switch (action.type) {
          case 'setVisibleAccounts':
            const { addresses = [] } = action;

            Monitor.get().fetchAccounts(addresses);
            next(action);

            break;
          default:
            next(action);
        }
      };
    };
  }
}
