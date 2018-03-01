/*
 * // Copyleft (ɔ) 2018 The Caliopen contributors.
 * // Use of this source code is governed by a GNU AFFERO GENERAL PUBLIC
 * // license (AGPL) that can be found in the LICENSE file.
 */

package Notifications

import (
	. "github.com/CaliOpen/Caliopen/src/backend/defs/go-objects"
)

// ByMobilePhonePush notifies an user by the mean of mobile phone facility
func (N *Notifier) ByMobilePhonePush(notif *Notification) CaliopenError {
	return NewCaliopenErr(NotImplementedCaliopenErr, "not implemented")
}
