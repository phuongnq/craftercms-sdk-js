export enum MessageScope {
  ALL = 'ALL',
  Local = 'LOCAL',
  External = 'EXTERNAL',
  Broadcast = 'BROADCAST'
}

export enum MessageTopic {

  ALL = 'ALL',

  GUEST_CHECK_IN = 'GUEST_CHECK_IN',
  GUEST_LOAD_EVENT = 'GUEST_LOAD_EVENT',

  HOST_ICE_START_REQUEST = 'HOST_ICE_START_REQUEST',
  HOST_END_ICE_REQUEST = 'HOST_END_ICE_REQUEST',
  HOST_RELOAD_REQUEST = 'HOST_RELOAD_REQUEST',
  HOST_NAV_REQUEST = 'HOST_NAV_REQUEST',

  NAV_REQUEST = 'NAV_REQUEST',

  PROJECT_CREATED = 'PROJECT_CREATED',
  PROJECT_UPDATED = 'PROJECT_UPDATED',
  PROJECT_DELETED = 'PROJECT_DELETED'

}

export interface Message {
  topic: MessageTopic;
  data: any;
  scope: MessageScope;
}
