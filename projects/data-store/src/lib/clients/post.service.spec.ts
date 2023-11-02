import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import {DataStoreModule} from '../data-store.module';
import {provideMockStore} from '@ngrx/store/testing';
import {StoreModule} from '@ngrx/store';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {DefaultDataServiceConfig} from '@ngrx/data';
import {EffectsModule} from '@ngrx/effects';
import {firstValueFrom} from 'rxjs';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: '/api',
  timeout: 3000, // request timeout
}

describe('PostService', () => {
  let service: PostService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(),
        EffectsModule.forRoot([]),
        DataStoreModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
      ]
    });
    service = TestBed.inject(PostService);

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should get all posts', async () => {
    const posts = [
      {id: 1, title: 'test', body: 'Test Body'}
    ];
    service.getAll();

    // confirm the api request
    const req = httpTestingController.expectOne('api/posts/');
    expect(req.request.method).toEqual('GET');
    req.flush(posts);

    // confirm that the entities are properly loaded
    const entities = await firstValueFrom(service.entities$);
    expect(entities).toEqual(posts);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  })

  it ('should get a post by id', async () => {
    const post = {id: 1, title: 'test', body: 'Test Body'};
    service.getByKey(1);

    // confirm the api path
    const req = httpTestingController.expectOne('api/post/1');
    expect(req.request.method).toEqual('GET');
    req.flush(post);

    // confirm that the entities are properly loaded
    const entities = await firstValueFrom(service.entities$);
    expect(entities).toEqual([post]);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  })

  it ('should query posts', async () => {
    const posts = [
      {id: 1, title: 'test', body: 'Test Body'}
    ];
    service.getWithQuery({
      title: 'test'
    });

    // confirm the api request
    const req = httpTestingController.expectOne('api/posts/?title=test');
    expect(req.request.method).toEqual('GET');
    req.flush(posts);

    // confirm that the entities are properly loaded
    const entities = await firstValueFrom(service.entities$);
    expect(entities).toEqual(posts);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  })

  it ('should create a post', async () => {
    const post = {id: 1, title: 'test', body: 'Test Body'};
    service.add(post);

    // confirm the api request
    const req = httpTestingController.expectOne('api/post/');
    expect(req.request.method).toEqual('POST');
    req.flush(post);

    // confirm that the entity was added
    const entities = await firstValueFrom(service.entities$);
    expect(entities).toEqual([post]);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  })

  it ('should update a post', async () => {
    const post = {id: 1, title: 'test', body: 'Test Body'};
    service.addOneToCache(post)
    const newPost = {...post, title: 'new test'}
    service.update(newPost);

    // confirm the api request
    const req = httpTestingController.expectOne('api/post/1');
    expect(req.request.method).toEqual('PUT');
    req.flush(post);

    // confirm that the entities are properly loaded
    const entities = await firstValueFrom(service.entities$);
    expect(entities[0]).toEqual(newPost);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  })
});
