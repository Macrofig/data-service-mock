const filterByParams = (params, options = {}) => {
  options = Object.assign({}, {caseSensitive: true}, options);
  return row => {
    const paramKeys = Object.keys(params);
    let keep = 0;

    paramKeys.forEach(key => {
      const rowValue = options.caseSensitive ? row[key] : (row[key] || '').toLowerCase();
      const paramValue = options.caseSensitive ? params[key]: params[key].toLowerCase();

      if (rowValue && rowValue === paramValue) {
        keep++;
      }
    });
    return keep === paramKeys.length;
  }
}

const filterByMeta = params => {
  params = Object.assign({}, {limit: 25, page: 1}, params);
  return (row, index) => {
    const maxIndex = params.limit * params.page;
    const minIndex = maxIndex - params.limit;
    return index >= minIndex && index < maxIndex;
  }
}

class QueryCache {
  constructor () {
    this.cache = new Map();
  }

  add (query, data = null) {
    this.cache.set(query, data);
    return data;
  }

  get (query) {
    return this.cache.get(query);
  }

  drop (query) {
    this.cache.delete(query);
  }

  exists (query) {
    return this.cache.has(query);
  }
}

class DataWrapper {
  constructor (data, options) {
    this.dataSet = data;
    this.id = options.id;
    this._limit = options.limit || 25;
    this._page = 1;
    this.data = data;
  }

  params () {
    return {
      limit: this._limit,
      page: this._page
    }
  }

  recalculateData () {
    const params = this.params();
    this.data = this.dataSet.filter(filterByMeta(params));
  }

  limit (limit) {
    this._limit = limit;
    this.recalculateData();
    return this;
  }

  page (page) {
    this._page = page;
    this.recalculateData();
    return this;
  }

  then (cb) {
    return cb(this.data);
  }
}

export default class ServiceMock {
  constructor (columns, data, options) {
    this.columns = columns;
    this.data = data;
    this.options = options;
    this.cache = new QueryCache();
  }

  find (params) {
    let data;
    if (this.cache.exists(params)) {
      data = this.cache.get(params);
    } else {
      data = this.data.filter(filterByParams(params, this.options));
      this.cache.add(params, data);
    }
    return (new DataWrapper(data, this.options));
  }
}
