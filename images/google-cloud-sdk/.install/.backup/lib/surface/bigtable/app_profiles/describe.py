# Copyright 2018 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""bigtable app-profiles describe command."""

from __future__ import absolute_import
from __future__ import unicode_literals
from googlecloudsdk.api_lib.bigtable import app_profiles
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.bigtable import arguments


class DescribeAppProfile(base.DescribeCommand):
  """Describe an existing Bigtable app-profile."""

  @staticmethod
  def Args(parser):
    """Register flags for this command."""
    arguments.AddAppProfileResourceArg(parser, 'to describe')

  def Run(self, args):
    """This is what gets called when the user runs this command.

    Args:
      args: an argparse namespace. All the arguments that were provided to this
        command invocation.

    Returns:
      Some value that we want to have printed later.
    """
    app_profile_ref = args.CONCEPTS.app_profile.Parse()
    return app_profiles.Describe(app_profile_ref)
