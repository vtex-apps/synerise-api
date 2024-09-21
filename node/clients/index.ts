import { IOClients } from '@vtex/api'

import Synerise from './synerise'
import { IntelligentSearch } from './intelligent-search'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get synerise() {
    return this.getOrSet('synerise', Synerise)
  }

  public get intelligentSearch() {
    return this.getOrSet('intelligentSearch', IntelligentSearch)
  }
}
