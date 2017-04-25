# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function, unicode_literals

from cassandra.cqlengine import columns

from caliopen_storage.store import BaseUserType


class MessageAttachment(BaseUserType):

    """Attachment nested in message."""

    content_type = columns.Text()
    is_inline = columns.Boolean()
    name = columns.Text()
    size = columns.Integer()
