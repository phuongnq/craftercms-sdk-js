import { AnyAction } from 'redux';
import { flattenEntries } from '../utils';

import { 
  GET_ITEM,
  GET_ITEM_COMPLETE, 
  GET_DESCRIPTOR,
  GET_DESCRIPTOR_COMPLETE,
  GET_CHILDREN,
  GET_CHILDREN_COMPLETE,
  GET_TREE,
  GET_TREE_COMPLETE,
  GET_NAV_BREADCRUMB,
  GET_NAV_BREADCRUMB_COMPLETE,
  GET_NAV,
  GET_NAV_COMPLETE
} from '../actions/content';
import { StateContainer, Item, Descriptor } from '@craftercms/models';

export function itemsReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {}
}, action: AnyAction): StateContainer<Item> {
  switch (action.type) {
    case GET_ITEM: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload]: true
        }
      }
    }
    case GET_ITEM_COMPLETE: {
      const item: Item = action.payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [item.url]: false
        },
        entries: {
          ...state.entries,
          [item.url]: item
        }
      }
    }
    default:
      return state
  }
}

var currentDescriptorUrl;
export function descriptorsReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {}
}, action: AnyAction): StateContainer<Item> {
  switch (action.type) {
    case GET_DESCRIPTOR: {
      currentDescriptorUrl = action.payload;

      return {
        ...state,
        loading: {
          ...state.loading,
          [currentDescriptorUrl]: true
        }
      }
    }
    case GET_DESCRIPTOR_COMPLETE: {
      const descriptor = action.payload;    //TODO: Properly set Descriptor model
      return {
        ...state,
        loading: {
          ...state.loading,
          [currentDescriptorUrl]: false
        },
        entries: {
          ...state.entries,
          [currentDescriptorUrl]: descriptor
        }
      }
    }
    default:
      return state
  }
}

var currentChildrenUrl;
export function childrenReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {}
}, action: AnyAction): StateContainer<Item> {
  switch (action.type) {
    case GET_CHILDREN: {
      currentChildrenUrl = action.payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [currentChildrenUrl]: true
        }
      }
    }
    case GET_CHILDREN_COMPLETE: {
      const item: Item = action.payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [currentChildrenUrl]: false
        },
        entries: {
          ...state.entries,
          [currentChildrenUrl]: item
        }
      }
    }
    default:
      return state
  }
}

export function treeReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {},
  childIds: {}
}, action: AnyAction): StateContainer<any> {
  switch (action.type) {
    case GET_TREE: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.url]: true
        }
      }
    }
    case GET_TREE_COMPLETE: {
      const flatEntries = flattenEntries(action.payload, 'children');

      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.url]: false
        },
        entries: Object.assign(state.entries, flatEntries.entries),
        childIds: Object.assign(state.childIds, flatEntries.childIds)
      }
    }
    default:
      return state
  }
}

var currentBreadcrumbUrl;
export function breadcrumbsReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {}
}, action: AnyAction): StateContainer<Item> {
  switch (action.type) {
    case GET_NAV_BREADCRUMB: {
      currentBreadcrumbUrl = action.payload.url

      return {
        ...state,
        loading: {
          ...state.loading,
          [currentBreadcrumbUrl]: true
        }
      }
    }
    case GET_NAV_BREADCRUMB_COMPLETE: {
      const breadcrumb: Array<Item> = action.payload;     //TODO: should it be another model?
      return {
        ...state,
        loading: {
          ...state.loading,
          [currentBreadcrumbUrl]: false
        },
        entries: {
          ...state.entries,
          [currentBreadcrumbUrl]: breadcrumb
        }
      }
    }
    default:
      return state
  }
}

export function navigationReducer(state = {
  loading: {}, // { all: boolean, [id: string]: boolean }
  entries: {},
  childIds: {}
}, action: AnyAction): StateContainer<any> {
  switch (action.type) {
    case GET_NAV: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.url]: true
        }
      }
    }
    case GET_NAV_COMPLETE: {
      const item: Item = action.payload;
      const flatEntries = flattenEntries(action.payload, 'children');

      return {
        ...state,
        loading: {
          ...state.loading,
          [item.url]: false
        },
        entries: Object.assign(state.entries, flatEntries.entries),
        childIds: Object.assign(state.childIds, flatEntries.childIds)
      }
    }
    default:
      return state
  }
}
