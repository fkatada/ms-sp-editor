import { ICustomizations } from '@fluentui/react/lib/Utilities'
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type HomeActions = ActionType<typeof actions>

export interface IHomeState {
  loading: boolean,
  isDark: boolean,
  appMessage: IAppMessage,
  theme: ICustomizations,
  livereload: boolean,
}

export interface IAppMessage {
  showMessage: boolean
  message: string
  color: MessageBarColors
}

export interface IDefinitions {
  content: string,
  filePath: string
}

export enum Constants {
    // ADD_ITEM = 'ADD_ITEM',
    SET_LOADING = 'SET_LOADING',
    SET_DARK_MODE = 'SET_DARK_MODE',
    SET_APP_MESSAGE = 'SET_APP_MESSAGE',
    SET_THEME = 'SET_THEME',
    SET_LIVERELOAD = 'SET_LIVERELOAD',
}

export enum MessageBarColors {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
  light = 'light',
  medium = 'medium',
  dark = 'dark',
}
