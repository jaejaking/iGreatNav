import { Injectable} from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import {NavigationUrl} from './navigation-url';
import {Constants} from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class NavigationUrlHttpServiceService{
  
  ngOnInit(): void {
     
  }

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 请求列表
   * @param keyword 关键词
   * @param pageIndex 页面索引，从1开始
   * @param pageSize 每页显示的数量
   */
  list(keyword:string,pageIndex: number,pageSize: number,cateId:number){
    const params = new HttpParams()
    .set('keywords', keyword)
    .set('pageIndex', pageIndex+'')
    .set('pageSize',pageSize+'')
    .set('cateId',cateId+'');
    return this.http.get(Constants.HTTP_SERVER + "navigation-urls/list",{params});
  }

  allCate(){
    const params = new HttpParams()
    .set('keywords', "")
    .set('pageIndex', '0')
    .set('pageSize','100000')
    .set('parentId','-1');
    return this.http.get(Constants.HTTP_SERVER + "navigation-cate/list",{params});
  }

  /**
   * 添加和修改
   * @param nav
   */
  addOrUpdate(nav: NavigationUrl){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const params = {
      "pkId": nav.pkId,
      "shortName": nav.shortName,
      "longName": nav.longName,
      "url": nav.url,
      "icon": nav.icon,
      "cateId": nav.cateId,
      "orderValue": nav.orderValue?nav.orderValue:0
    }
    return this.http.post(Constants.HTTP_SERVER + "navigation-urls/addOrUpdate",params,httpOptions);
  }

  /**
   * 批量删除
   * @param ids 需要删除的id集合
   */
  batDelete(ids: number[]){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const params = ids;
    return this.http.post(Constants.HTTP_SERVER + "navigation-urls/delete",params,httpOptions);
  }

  /**
   * 单个删除
   * @param id 单个对象的id
   */
  delete(id: number){
    return this.batDelete([id]);
  }
}
