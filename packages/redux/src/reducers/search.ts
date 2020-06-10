/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {
  SEARCH,
  SEARCH_COMPLETE
} from '../actions/search';

const DEFAULT = {
  search: {
    loading: true,
    query: '',
    response: {}
  }
};

// TODO
// What is it that this searches?
// What's the model?
// What's a better name?

export function searchReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {}
}, action) {
  switch (action.type) {
    case SEARCH: {
      const queryId: string = action.payload.uuid;

      return {
        ...state,
        loading: {
          ...state.loading,
          [queryId]: true
        }
      }
    }
    case SEARCH_COMPLETE: {
      const response = action.payload.response,
            queryId = action.payload.queryId;

      return {
        ...state,
        loading: {
          ...state.loading,
          [queryId]: false
        },
        entries: {
          ...state.entries,
          [queryId]: response
        }
      }
    }
    default:
      return state
  }
}
