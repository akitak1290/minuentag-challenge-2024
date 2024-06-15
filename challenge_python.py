"""
Refactor the next function using yield to return the array of objects found by the
`s3.list_objects_v2` function that matches the given prefix.
"""
"""
ANSWER:
- replace the object_list with yield to return the array one by one
instead of the whole array after calling get_s3_objects()
"""
def get_s3_objects(bucket, prefix=''):
    s3 = boto3.client('s3')

    kwargs = {'Bucket': bucket}
    next_token = None
    if prefix:
        kwargs['Prefix'] = prefix
    # object_list = [] # removed
    while True:
        if next_token:
            kwargs['ContinuationToken'] = next_token
        resp = s3.list_objects_v2(**kwargs)
        contents = resp.get('Contents', [])
        for obj in contents:
            key = obj['Key']
            if key.startswith(prefix):
                # object_list.append(obj) # removed
                yield obj
        next_token = resp.get('NextContinuationToken', None)

        if not next_token:
            break
    # return object_list # removed

"""
Please, full explain this function: document iterations, conditionals, and the
function as a whole
"""
"""
ANSWER: 
- This function is used to manage inventory of `obj` by comparing the items in it
with `main_plan` and `extensions`. Items not found in `extensions` or are not 
`main_plan` is marked as delete, while items that are have their price's quantity
updated based on the quantity of the matching price in `extensions`
- Items that are not found in extensions are also added to the final result.

@param main_plan {id: int, ...}
@param obj {items: {data: {price: {id: int}...}...}...}
@params extensions {price: {id: int}, qty: int...}
@return {id: str, qty: int}[]
"""
def fn(main_plan, obj, extensions=[]):
    
    items = [] # the return list of items from `obj` that satisfy some conditions
    sp = False # a flag to check if the main plan's price plan is in the `obj` parameter
    cd = False # an unused flag to track if an item/product is marked as deleted

    ext_p = {} # a dict to store a trimmed version of the `extensions` parameter

    # !assume that price.id is for a price plan
    # for each item in the `extensions` parameter
    for ext in extensions:
        # store the price plan's id and qty into ext_p
        ext_p[ext['price'].id] = ext['qty'] 

    # for each item in the obj.items.data list of objects
    for item in obj['items'].data:
        # create the initial `product` object with the item's id
        product = {
            'id': item.id
        }

        # if the current item/product's price plan of the current item doesn't the the main plan
        # and the price plan is not part the extension plans
        if item.price.id != main_plan.id and item.price.id not in ext_p:
            # mark this item/product as deleted (no more plans count?)
            product['deleted'] = True
            # set flag as deleted
            cd = True
        # if the price plan is part of the extension plans
        elif item.price.id in ext_p:
            # update the quantity of the current item/product price plan
            qty = ext_p[item.price.id]
            if qty < 1: # mark item/product as deleted if the price plan in extension plans is out
                product['deleted'] = True
            else:
                product['qty'] = qty
            del ext_p[item.price.id] # remove the price plan from the extension plans
        # if the price plan is the same price plan as the main plan
        elif item.price.id == main_plan.id:
            # mark that the main plan is found 
            sp = True

        # add the item/product to the return list
        items.append(product)
    
    # if the main plan's price plan is not in `obj`
    if not sp:
        # add the main plan to the return list
        items.append({
            'id': main_plan.id,
            'qty': 1
        })
    
    # for the rest of the plans in the extension plans that wasn't found in `obj`
    for price, qty in ext_p.items():
        # and if the quantity of those plan is bigger than 1
        if qty < 1:
            continue
        # add the plan to the return list
        items.append({
            'id': price,
            'qty': qty
        })
    
    # return a list of items
    return items


"""
Having the class `Caller` and the function `fn`
Refactor the function `fn` to execute any method from `Caller` using the argument `fn_to_call`
reducing the `fn` function to only one line.
"""
"""
ANSWER: used getattr()
"""
class Caller:
    add = lambda a, b : a + b
    concat = lambda a, b : f'{a},{b}'
    divide = lambda a, b : a / b
    multiply = lambda a, b : a * b

def fn(fn_to_call, *args):
    return getattr(Caller, fn_to_call)(*args)
    # result = None

    # if fn_to_call == 'add':
    #     result = Caller.add(*args)
    # if fn_to_call == 'concat':
    #     result = Caller.concat(*args)
    # if fn_to_call == 'divide':
    #     result = Caller.divide(*args)
    # if fn_to_call == 'multiply':
    #     result = Caller.multiply(*args)

    # return result


"""
A video transcoder was implemented with different presets to process different videos in the application. The videos should be
encoded with a given configuration done by this function. Can you explain what this function is detecting from the params
and returning based in its conditionals?
"""

"""
ANSWER:
- This function takes in a python directory containing sub directories
of video configuration presets, and a width and height of the video frame.
- From what I look up on video transcoder and some guesses:
    - ar means aspect ratio.
    - 'p' config is taller so it is portrait.
    - 's' has same width and height so it is square.
    - 'l' is longer in width so it is landscape.
- The function checks if the aspect ratio passed to it and search the
corresponding sub directory. Using list comprehension, it will search
for the configuration that matches or smaller than the width of th
video frame.
- In the end it returns a list of (maybe) objects extracted, representing
the configurations for the video frame.
"""
def fn(config, w, h):
    v = None
    ar = w / h

    if ar < 1:
        v = [r for r in config['p'] if r['width'] <= w]
    elif ar > 4 / 3:
        v = [r for r in config['l'] if r['width'] <= w]
    else:
        v = [r for r in config['s'] if r['width'] <= w]

    return v

"""
Having the next helper, please implement a refactor to perform the API call using one method instead of rewriting the code
in the other methods.
"""
"""
ANSWER: below
"""
import requests
class Helper:
    DOMAIN = 'http://example.com'
    SEARCH_IMAGES_ENDPOINT = 'search/images'
    GET_IMAGE_ENDPOINT = 'image'
    DOWNLOAD_IMAGE_ENDPOINT = 'downloads/images'

    AUTHORIZATION_TOKEN = {
        'access_token': None,
        'token_type': None,
        'expires_in': 0,
        'refresh_token': None
    }

        
    # def search_images(self, **kwargs):
    #     token_type = self.AUTHORIZATION_TOKEN['token_type']
    #     access_token = self.AUTHORIZATION_TOKEN['access_token']

    #     headers = {
    #         'Authorization': f'{token_type} {access_token}',
    #     }

    #     URL = f'{self.DOMAIN}/{self.SEARCH_IMAGES_ENDPOINT}'

    #     send = {
    #         'headers': headers,
    #         'params': kwargs
    #     }

    #     response = request.get(requests, method)(URL, **send)
    #     return response
        
    # def get_image(self, image_id, **kwargs):
    #     token_type = self.AUTHORIZATION_TOKEN['token_type']
    #     access_token = self.AUTHORIZATION_TOKEN['access_token']

    #     headers = {
    #         'Authorization': f'{token_type} {access_token}',
    #     }

    #     URL = f'{self.DOMAIN}/{self.GET_IMAGE_ENDPOINT}/{image_id}'

    #     send = {
    #         'headers': headers,
    #         'params': kwargs
    #     }

    #     response = request.get(requests, method)(URL, **send)
    #     return response

    # def download_image(self, image_id, **kwargs):
    #     token_type = self.AUTHORIZATION_TOKEN['token_type']
    #     access_token = self.AUTHORIZATION_TOKEN['access_token']

    #     headers = {
    #         'Authorization': f'{token_type} {access_token}',
    #     }

    #     URL = f'{self.DOMAIN}/{self.DOWNLOAD_IMAGE_ENDPOINT}/{image_id}'

    #     send = {
    #         'headers': headers,
    #         'data': kwargs
    #     }

    #     response = request.post(requests, method)(URL, **send)
    #     return response

    def _fetch(self, method, endpoint, resource_id=None, *kwargs):
        token_type = self.AUTHORIZATION_TOKEN['token_type']
        access_token = self.AUTHORIZATION_TOKEN['access_token']
        
        headers = {
            'Authorization': f'{token_type} {access_token}',
        }
        
        URL = f'{self.DOMAIN}/{endpoint}'
        
        if resource_id:
            URL = 'f{URL}/{resource_id}'
            
        data = {'params': kwargs} if method == 'get' else {'data': kwargs}
        send = {
            'headers': headers,
            **data
        }
        
        if method == 'get':
            response = request.get(URL, **send)
        elif method == 'post':
            response = request.post(URL, **send)
        else:
            raise ValueError(f"Unsupported HTTP method: {method}")
        
        return response
        

    def search_images(self, **kwargs):
        return self._fetch('get', self.SEARCH_IMAGES_ENDPOINT, **kwargs)
    
    def get_image(self, image_id, **kwargs):
        return self._fetch('get', self.GET_IMAGE_ENDPOINT, image_id, **kwargs)
    
    def download_image(self, image_id, **kwargs);
        return self._fetch('post', self.DOWNLOAD_IMAGE_ENDPOINT, image_id, **kwargs)