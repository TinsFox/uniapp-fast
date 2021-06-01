import {
  http
} from '@/api/service';

/**
 * 分页网络请求
 */
class Paging {
  // 生成器 Generator 设计模式
  //获取更多数据
  //?current=1&size=10
  current;
  size;
  req;
  locker = false;
  url;
  moreData = true;
  accumulator = [];
  total;
  pages;

  /**
   * 构造方法
   * @param req
   * @param current
   * @param size
   */
  constructor(req, current = 1, size = 10) {
    this.current = current;
    this.size = size;
    this.req = req;
    this.url = req.url; // 为了避免在处理url的时候会重复拼接
  }

  /**
   * 获取数据
   * @returns {Promise<*>}
   */
  async getMoreData() {
    if (!this.moreData) {//没有下一页数据了
      return;
    }
    if (!this._getLocker()) {//请求被锁定
      return;
    }
    const data = await this._actualGetData();//获取数据
    this._releaseLocker();// 释放锁
    return data;
  }

  /**
   * 获取分页数据
   * @returns {{moreData: boolean, accumulator: [], items: [], empty: boolean}|null}
   * @private
   */
  async _actualGetData() {
    const req = this._getCurrentReq();//构造请求参数
    let paging = http.get(req);
    if (!paging) {
      return null;
    }
    if (paging.total === 0) {//分页数据为空
      return {
        empty: true,//数据是否为空
        items: [],//当前分页数据
        moreData: false,//是否有更多数据
        accumulator: []// 累加器
      };
    }
    this.moreData = this._moreData(paging.pages, paging.current);
    if (this.moreData) {
      this.current += this.size;
    }
    this._accumulator(paging.items);
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    };
  }

  /**
   * 数据累加器
   * @param items
   * @private
   */
  _accumulator(items) {
    this.accumulator = this.accumulator.concat(items);
  }

  /**
   * 判断是否有下一页数据
   * @param totalPage
   * @param pageNum
   * @returns {boolean}
   * @private
   */
  static _moreData(pages, current) {
    return current < pages - 1;
  }

  /**
   * 处理请求参数
   * @returns {*}
   * @private
   */
  _getCurrentReq() {
    let url = this.url;
    const params = `current=${this.current}&size=${this.size}`;
    // 处理实例化对象的时候url是否已经携带了参数
    if (url.indexOf('?') !== -1) {
      url += '&' + params;
    } else {
      url = +'?' + params;
    }
    this.req.url = url;
    return this.req;
  }

  /**
   * 获取锁
   * @returns {boolean}
   * @private
   */
  _getLocker() {
    if (this.locker) {
      return false;
    } else {
      this.locker = true;
      return true;
    }
  }

  /**
   * 释放锁
   * @private
   */
  _releaseLocker() {
    this.locker = false;
  }

}

export {
  Paging
};
