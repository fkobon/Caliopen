# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function, unicode_literals

import logging

from caliopen_storage.helpers.connection import connect_storage

from .renderer import TextPlainRenderer, JsonRenderer, PartRenderer
from .deserializer import json_deserializer

log = logging.getLogger(__name__)

"""
Solution from :

https://github.com/striglia/pyramid_swagger/issues/177#issuecomment-373220674

"""


def swagger_error_view(exc, request):
    """Format swagger validation error."""
    for_json = {
        'message': exc.child.message,
    }

    return for_json


def includeme(config):
    """Configure REST API."""
    connect_storage()
    config.commit()

    # configure renderers
    config.add_renderer('text_plain', TextPlainRenderer)
    config.add_renderer('json', JsonRenderer)
    config.add_renderer('simplejson', JsonRenderer)
    config.add_renderer('part', PartRenderer)

    # configure specific views for API errors
    config.scan('caliopen_api.base.errors')
    config.add_cornice_deserializer('application/json',
                                    json_deserializer)
    swagger_context = 'pyramid_swagger.exceptions.RequestValidationError'
    config.add_exception_view(context=swagger_context,
                              view=swagger_error_view,
                              renderer='json')
    config.commit()
    log.info('Base API configured')
